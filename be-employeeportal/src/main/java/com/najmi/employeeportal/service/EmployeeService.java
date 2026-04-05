package com.najmi.employeeportal.service;

import com.najmi.employeeportal.entity.Employee;
import com.najmi.employeeportal.entity.EmployeeHistory;
import com.najmi.employeeportal.repository.EmployeeHistoryRepository;
import com.najmi.employeeportal.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeHistoryRepository employeeHistoryRepository;

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAllByOrderByNameAsc();
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    public Employee createEmployee(Employee employee) {
        Employee savedEmployee = employeeRepository.save(employee);
        logHistory(savedEmployee, "CREATE");
        return savedEmployee;
    }

    public Optional<Employee> updateEmployee(Long id, Employee employeeDetails) {
        return employeeRepository.findById(id).map(employee -> {
            if (employeeDetails.getName() != null) {
                employee.setName(employeeDetails.getName());
            }
            if (employeeDetails.getContactNumber() != null) {
                employee.setContactNumber(employeeDetails.getContactNumber());
            }
            Employee updatedEmployee = employeeRepository.save(employee);
            logHistory(updatedEmployee, "UPDATE");
            return updatedEmployee;
        });
    }

    public boolean deleteEmployee(Long id) {
        return employeeRepository.findById(id).map(employee -> {
            logHistory(employee, "DELETE");
            employeeRepository.deleteById(id);
            return true;
        }).orElse(false);
    }

    public List<EmployeeHistory> getEmployeeHistory() {
        return employeeHistoryRepository.findAllByOrderByActionTimestampDesc();
    }

    private void logHistory(Employee employee, String action) {
        EmployeeHistory history = new EmployeeHistory();
        history.setEmployeeId(employee.getId());
        history.setAction(action);
        history.setName(employee.getName());
        history.setContactNumber(employee.getContactNumber());
        history.setDepartment(employee.getDepartment());
        history.setActionTimestamp(LocalDateTime.now());

        employeeHistoryRepository.save(history);
    }
}