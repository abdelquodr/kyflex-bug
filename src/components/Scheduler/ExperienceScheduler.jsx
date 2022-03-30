import Paper from '@material-ui/core/Paper';
import React, { useState, useCallback, useEffect } from 'react';
import { EditingState, ViewState } from '@devexpress/dx-react-scheduler';
import {
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
  DateNavigator,
  EditRecurrenceMenu,
  Scheduler,
  TodayButton,
  Toolbar,
  WeekView,
  AllDayPanel,
  ViewSwitcher,
  MonthView,
  DragDropProvider,
} from '@devexpress/dx-react-scheduler-material-ui';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';


export const ExperienceScheduler = ({
  editable,
  onCommitChanges,
  schedulerData,
  bookings,
  height,
}) => {
  const [data, setData] = useState([]);
  const [dayHour, setDayHour] = useState({
    start: 0,
    end: 24,
  });
  const profileState = useSelector(state => state.accounts.profile);

  const currentDateString = format(schedulerData.length && schedulerData[0].startDate || new Date(), 'yyyy-MM-dd');

  useEffect(() => {
    const data = [];
    let changed = false;
    if (schedulerData) {
      data.push(
        ...schedulerData.map((data) => ({
          ...data,
          key: `appointment-${data.id}`,
        }))
      );
      changed = true;
    }

    if (bookings) {
      data.push(
        ...bookings.map((data) => ({ ...data, key: `bookings-${data.id}` }))
      );
      changed = true;
    }
    if (changed) {
      setData(data);
    }
  }, [schedulerData, bookings]);

  const Appointment = useCallback(
    React.memo(function Appointment(props) {
      const { data } = props;
      const userProfile = profileState && profileState.customer_profile;
      let color = '#FDBD2D';
      if (data.bookingStatus) {
        color = '#5b5b5b';
        data.disabled = true;
      }
      if (userProfile && userProfile.id === data.user) {
        color = '#68C7CA';
        data.disabled = false;
      }
      return (
        <Appointments.Appointment
          {...props}
          style={{ backgroundColor: color }}
          key={
            data.bookingStatus
              ? `booking-${data.id}`
              : `availability-${data.id}`
          }
          onDoubleClick={!data.disabled && props.onDoubleClick}
        />
      );
    }),
    [profileState]
  );

  return (
    <Paper variant="outlined" elevation={3}>
      <Scheduler data={data} height={height} firstDayOfWeek={0} width={'100%'}>
        <ViewState defaultCurrentDate={currentDateString} />
        {editable && (
          <EditingState
            onCommitChanges={onCommitChanges}
            style={{ width: '100%' }}
          />
        )}
        <WeekView startDayHour={dayHour.start} endDayHour={dayHour.end} />
        <MonthView startDayHour={dayHour.start} endDayHour={dayHour.end} />
        <Toolbar />
        <TodayButton />
        <DateNavigator />
        {editable && <EditRecurrenceMenu />}
        {editable && <ConfirmationDialog />}
        <Appointments appointmentComponent={Appointment} />
        {editable && <AppointmentTooltip showCloseButton showOpenButton />}
        <AllDayPanel />
        <ViewSwitcher />
        <DragDropProvider />
        <AppointmentForm />
      </Scheduler>
    </Paper>
  );
};
