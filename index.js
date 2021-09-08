'use strict';
const employeeDetails=require("./data.json")

const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/getEmployeeDetails',
        handler: () => {
            return employeeDetails;
        }
    });

    server.route({
        method:'POST',
        path:'/addEmployee',
        handler: (request) => {
            const payload = request.payload;
            employeeDetails.employees.push(payload);
            console.log(employeeDetails);
            return `New Employee added!: ${payload.firstName} and ${payload.lastName}`;
        }
    })

    server.route({
        method:'PUT',
        path:'/updateEmployee/{firstName?}',
        handler:(request)=>{
            const updatePayload = request.payload;
            const index=employeeDetails.employees.findIndex(emp=>emp.firstName===request.params.firstName);
            if(index===-1) {
                return `Employee does not exists! ${request.params.firstName}`;
            }
            employeeDetails.employees[index].firstName=updatePayload.firstName;
            employeeDetails.employees[index].lastName=updatePayload.lastName;
            return `Employee updated!`;
        }
    })

    server.route({
        method: 'DELETE',
        path: '/deleteEmployee',
        handler: (request) => {
            const deletePayload = request.payload;
            const index=employeeDetails.employees.findIndex(emp=>emp.firstName===deletePayload.firstName);
            if(index===-1) {
                return `Given employee firstName does not exists: ${request.params.firstName}`;
            }
            employeeDetails.employees.splice(index,1);
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