/*
    renderMonthText.js : function that renders month text
    Parameter:
        month: integer from 1 ~ 12
    
    How to use:
        RenderMonthText(11) //renders November
*/

const RenderMonthText = (month) => {
  switch (month) {
    case 12:
      return 'December';
    case 11:
      return 'November';
    case 10:
      return 'October';
    case 9:
      return 'September';
    case 8:
      return 'August';
    case 7:
      return 'July';
    case 6:
      return 'June';
    case 5:
      return 'May';
    case 4:
      return 'April';
    case 3:
      return 'March';
    case 2:
      return 'Febuary';
    default:
      return 'January';
  }
};

export { RenderMonthText };
