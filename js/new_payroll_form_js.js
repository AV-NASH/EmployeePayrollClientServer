let isUpdate = false;
let employeePayrollObj = {};

window. addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
    if (name.value. length == 0) {
    textError.textContent ="";
    return;}
    try {
    checkName(name.value);
    textError.textContent = "";
    
    } catch (e) {
    textError.textContent = e;
}  
});


const salary=document.querySelector('#salary');
const output=document.querySelector('.salary-output');
output.textContent=salary.value;
salary.addEventListener('input',function(){
    output.textContent=salary.value;
});
document.querySelector('#cancelButton').href=site_properties.home_page;
checkForUpdate();
});



const dateCheck=()=>{
    const dateerror=document.querySelector('.date-error');
    let dateString = getInputValueById('#day')+" "+getInputValueById('#month')+" "+
    getInputValueById('#year') ;
    let date=Date.parse(dateString);
    try{
       checkStartDate(new Date(Date.parse(startDate)))
        dateerror.textContent="";
    }
    catch (e) {
        dateerror.textContent = e;
    }  
    }

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setEmployeePayroll0bject();
    if (site_properties.use_local_storage.match("true")) {
        createAndUpdateStorage();
        resetForm();
    window. location.replace(site_properties.home_page);
    } else {
     createOrUpdateEmployeePayroll();
    }
    } catch (e) {
    return;
    }
}

const createAndUpdateStorage = () => {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList) {
    let empPayrollData = employeePayrollList.
    find(empData => empData.id == employeePayrollObj.id);
    if (!empPayrollData) {
    employeePayrollList.push(employeePayrollObj);
    } else {
    const index = employeePayrollList
    .map(empData => empData.id)
    .indexOf (empPayrollData.id);
    employeePayrollList.splice(index, 1,employeePayrollObj);
    }
    } else{
    employeePayrollList = [createEmployeePayrollData()]
    }
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const resetForm = () => {
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues(' [name=gender]');
    unsetSelectedValues(' [name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day','1');
    setValue('#month', 'January');
    setValue('#year', '2020');
}
    
    const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue) ;
    allItems.forEach(item => {
    item.checked = false;
    });}
    
    const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;}
    
    const setValue = (id, value) => {
    const element = document.querySelector(id);
    element. value= value;
    }
    
    
    
const createEmployeePayroll = () => {
    
    let employeePayrollData = new EmployeePayrollData();
    try {
    employeePayrollData.name = getInputValueById('#name');
    let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+
    getInputValueById('#year') ;
    employeePayrollData.startDate = Date.parse(date) ;
    var v=0;
    } catch (e) {
    throw e;
    }
    employeePayrollData.profilePic = getSelectedValues(' [name=profile] ').pop();
    employeePayrollData.gender = getSelectedValues(' [name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department] ');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById( '#notes'); 
    // employeePayrollData.id=employeePayrollData.startDate+(Math.ceil(Math.random()*100)+Math.ceil(Math.random()*100));
    alert (employeePayrollData.toString());
    return employeePayrollData;
}
const getSelectedValues = (propertyValue) => {
    
    let allItems = document. querySelectorAll(propertyValue) ;
    let sellItems = [];
    allItems.forEach(item => {
    if(item.checked) sellItems.push(item.value) ;
    });
    return sellItems;
}

const getInputValueById = (id) => {
    let value = document. querySelector(id).value;
    return value;}

const checkForUpdate = () => {

    const employeePayrollJson = localStorage.getItem( 'editEmp'); 
    isUpdate = (employeePayrollJson) ? true : false; 
    if (!isUpdate) return; 
    employeePayrollObj = JSON.parse(employeePayrollJson) ; 
    setForm();
}

const setForm = () => {
    setValue('#name', employeePayrollObj._name) ;
    setSelectedValues('[name=profile]', employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]', employeePayrollObj._gender) ;
    setSelectedValues('[name=department]', employeePayrollObj._department) ;
    setValue('#salary',employeePayrollObj._salary);
    setTextValue('.salary-output', employeePayrollObj._salary);
    setValue('#notes',employeePayrollObj._note) ;
    let date =stringifyDate(employeePayrollObj._startDate).split(" ");
    let monthdate=date[1].split(",")
    setValue('#day',monthdate[0]);
    setValue('#month',date[0]);
    setValue('#year',date[2]);
}

const setSelectedValues = (propertyValue, value) => {
    let allItems = document. querySelectorAll(propertyValue) ;
    allItems.forEach(item => {
    if(Array.isArray(value)) {
        if (value.includes(item.value)) {
        item.checked = true;
      }
    }
    else if (item.value === value)
         item.checked = true;   
    });
 }

 const setEmployeePayrollObject = () => {
     if(!isUpdate) employeePayrollObj.id=createNewEmployeeld();

    employeePayrollObj._name = getInputValueById('#name');
    employeePayrollObj._profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollObj._gender = getSelectedValues(' [name=gender]').pop();
    employeePayrollObj._department = getSelectedValues(' [name=department]');
    employeePayrollObj._salary = getInputValueById('#salary');
    employeePayrollObj._note = getInputValueById('#notes');
    let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+
    getInputValueById('#year') ;
    employeePayrollObj._startDate = date;
}

const createEmployeePayrollData = (id) => {
    let employeePayrollData = new EmployeePayrollData();
    if (!id) employeePayrollData.id = createNewEmployeeld();
    else employeePayrollData.id = id;
    setEmployeePayrollData(employeePayrollData) ;
    return employeePayrollData;
}

const setEmployeePayrollData = (employeePayrollData) => {
    try {
    employeePayrollData.name = employeePayrollObj._name;
    } catch (e) {
    setTextValue('.text-error', e);
    throw e;}
    employeePayrollData.profilePic = employeePayrollObj._profilePic;
    employeePayrollData.gender = employeePayrollObj._gender;
    employeePayrollData.department =employeePayrollObj._department;
    employeePayrollData.salary =employeePayrollObj._salary;
    employeePayrollData.note = employeePayrollObj._note;
    try {
    employeePayrollData.startDate =
    new Date(Date.parse(employeePayrollObj._startDate) );
    } catch (e) {
    setTextValue('.date-error', e);
    throw e;}
    alert (employeePayrollData.toString());
}

const createNewEmployeeld = () => {

    let empID = localStorage.getItem("EmployeeID");
    empID = !empID ? 1 : (parseInt(empID)+1).toString();
    localStorage.setItem("EmployeeID", empID) ; 
    return empID;
}

const checkName = (name) => {
   
    let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
    if (!nameRegex.test(name)) throw 'Name is Incorrect!';
}

const checkStartDate = (startDate) => {
    let now = new Date();
    if (startDate > now) throw 'Start Date is a Future Date!';
    var diff = Math.abs(now.getTime()-startDate.getTime());
    if (diff / (1000 * 60 * 60 * 24) > 30)
    throw 'Start Date is beyond 30 Days!';
}

const createOrUpdateEmployeePayroll = () => {
    let postURL= site_properties.server_url;
    let methodCall = "POST";
    if(isUpdate) {
    methodCall = "PUT";
    postURL=postURL + employeePayroll0bj.id.toString();
    
    }
    makeServiceCall(methodCall, postURL, true, employeePayroll0bj)
    . then ( responseText => {
    resetForm();
    window.location.replace(site_properties.home_page);
    })
    .catch(error => {
    throw error;
    });
    }
    