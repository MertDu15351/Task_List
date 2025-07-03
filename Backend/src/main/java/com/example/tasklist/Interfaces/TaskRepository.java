package com.example.tasklist.Interfaces;

import com.example.tasklist.Entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
