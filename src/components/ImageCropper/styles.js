import ColorVars from '../../sass/colors.scss';
export const styles = (theme) => ({
  cropContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
    background: 'transparent',
    [theme.breakpoints.up('sm')]: {
      height: 400,
    },
  },
  cropButton: {
    display: 'block',
    flexShrink: 0,
    margin: '0 auto',
    backgroundColor: `${ColorVars.mainKyflexColor} !important`,
    boxShadow: 'none',
    padding: 'auto 10px',
    '&:hover': {
      boxShadow: 'none',
    }
  },
  controls: {
    padding: 16,
    display: 'block',
    flexDirection: 'column',
    alignItems: 'stretch',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  sliderContainer: {
    display: 'block',

    alignItems: 'center',
  },
  sliderLabel: {
    [theme.breakpoints.down('xs')]: {
      minWidth: 65,
    },
  },
  slider: {
    padding: '22px 0px',
    marginLeft: 32,
    color: ColorVars.mainKyflexColor,
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: '0 16px',
    },
  },
});
