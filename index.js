/* Your Code Here */
function createEmployeeRecord(data) {
 
    return {
      firstName: data[0],
      familyName: data[1],
      title: data[2],
      payPerHour: data[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(data) {
  
    return data.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(dateTime) {
  
    const [date, hour] = dateTime.split(' ');
    this.timeInEvents.push({ type: 'TimeIn', date, hour: parseInt(hour, 10) });
    return this;
  }
  
  function createTimeOutEvent(dateTime) {
  
    const [date, hour] = dateTime.split(' ');
    this.timeOutEvents.push({ type: 'TimeOut', date, hour: parseInt(hour, 10) });
    return this;
  }
  
  function hoursWorkedOnDate(date) {
    
    const timeIn = this.timeInEvents.find(event => event.date === date);
    const timeOut = this.timeOutEvents.find(event => event.date === date);
    if (timeIn && timeOut) {
      return (timeOut.hour - timeIn.hour) / 100;
    }
    return 0;
  }
  
  function wagesEarnedOnDate(date) {
    
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this.payPerHour;
  }
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor.call(employee), 0);
  }
  

