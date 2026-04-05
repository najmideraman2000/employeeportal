package com.najmi.employeeportal.service;

import com.najmi.employeeportal.entity.Employee;
import com.najmi.employeeportal.entity.EmployeeHistory;
import com.najmi.employeeportal.repository.EmployeeHistoryRepository;
import com.najmi.employeeportal.repository.EmployeeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    private static final Logger logger = LoggerFactory.getLogger(EmployeeService.class);

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeHistoryRepository employeeHistoryRepository;

    public List<Employee> getAllEmployees() {
        logger.info("Fetching all employees from the database");
        return employeeRepository.findAllByOrderByNameAsc();
    }

    public Optional<Employee> getEmployeeById(Long id) {
        logger.info("Fetching employee details for ID: {}", id);
        return employeeRepository.findById(id);
    }

    public Employee createEmployee(Employee employee) {
        logger.info("Attempting to create new employee: {}", employee.getName());

        Employee savedEmployee = employeeRepository.save(employee);
        logHistory(savedEmployee, "CREATE");

        logger.info("Successfully created employee with ID: {}", savedEmployee.getId());
        return savedEmployee;
    }

    public Optional<Employee> updateEmployee(Long id, Employee employeeDetails) {
        logger.info("Attempting to update employee with ID: {}", id);

        return employeeRepository.findById(id).map(employee -> {
            if (employeeDetails.getName() != null) {
                employee.setName(employeeDetails.getName());
            }
            if (employeeDetails.getContactNumber() != null) {
                employee.setContactNumber(employeeDetails.getContactNumber());
            }
            Employee updatedEmployee = employeeRepository.save(employee);
            logHistory(updatedEmployee, "UPDATE");

            logger.info("Successfully updated employee with ID: {}", id);
            return updatedEmployee;
        });
    }

    public boolean deleteEmployee(Long id) {
        logger.info("Attempting to delete employee with ID: {}", id);

        return employeeRepository.findById(id).map(employee -> {
            logHistory(employee, "DELETE");
            employeeRepository.deleteById(id);

            logger.info("Successfully deleted employee with ID: {}", id);
            return true;
        }).orElseGet(() -> {
            logger.warn("Failed to delete employee. ID {} not found in the database.", id);
            return false;
        });
    }

    public List<EmployeeHistory> getEmployeeHistory() {
        logger.info("Fetching system audit history");
        return employeeHistoryRepository.findAllByOrderByActionTimestampDesc();
    }

    private void logHistory(Employee employee, String action) {
        logger.debug("Recording {} audit log for employee ID: {}", action, employee.getId());

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