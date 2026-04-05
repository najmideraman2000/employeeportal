package com.najmi.employeeportal.repository;

import com.najmi.employeeportal.entity.EmployeeHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeHistoryRepository extends JpaRepository<EmployeeHistory, Long> {
    List<EmployeeHistory> findAllByOrderByActionTimestampDesc();
}