'use strict';
const employeeDetails = require("./data.json")

const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    // get all
    server.route({
        method: 'GET',
        path: '/getEmployeeDetails',
        handler: (request) => {
            console.log(request.payload)
            return employeeDetails;
        }
    });
    server.route({
        method: 'GET',
        path: '/getEmployeeDetailsId/{id?}',
        handler: (request) => {
            const getpayload = request.payload;
            const index = employeeDetails.employees.findIndex(emp => emp.id === request.query.id);
            console.log(index)
            return employeeDetails.employees[index]

        }
    });

    
let flag=1;
let index=[]
    server.route({
        method: 'POST',

        path: '/addEmployee',
        handler: (request) => {
            const payload = request.payload;
             index = employeeDetails.employees?.map(emp => (emp.id) )
             console.log(index)
            console.log(payload.id +","+ index)
        //    console.log(employeeDetails.employees.length)
            for(let i=1; i<index.length;i++)
            {
                if( payload.id === index[i]){
                    flag = 0
                }
            }
            console.log("flag"+flag)
            if(flag != 1)
            {
                return ` id is already taken `
            }
            else{
                employeeDetails.employees.push(payload);
            }
            console.log(employeeDetails);

            return `New Employee added!: ${payload.firstName} and ${payload.lastName}`;
        }
    })

    server.route({
        method: 'PUT',
        path: '/updateEmployee/{id?}',
        handler: (request) => {
            const updatePayload = request.payload;
            const index = employeeDetails.employees.findIndex(emp => emp.id === request.query.id);
            console.log(index)
            if (index === -1) {
                return `Employee does not exists! ${request.query.id}`;
            }
            employeeDetails.employees[index].firstName = updatePayload.firstName;
            employeeDetails.employees[index].lastName = updatePayload.lastName;
            return `Employee updated!: ${updatePayload.firstName}`;
        }
    })

    server.route({
        method: 'DELETE',
        path: '/deleteEmployee/{id?}',
        handler: (request) => {
            const deletePayload = request.payload;
            const index = employeeDetails.employees.findIndex(emp => emp.id === request.query.id);
            console.log(index)
            if (index === -1) {
                return `Given employee firstName does not exists: ${request.params.firstName}`;
            }
            employeeDetails.employees.splice(index, 1);
            return 'Employee deleted!!!';
        }
    })

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();