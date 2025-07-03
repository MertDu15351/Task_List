package com.example.tasklist.Controllers;

import com.example.tasklist.Entities.Task;
import com.example.tasklist.Interfaces.TaskRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/tasks")
@RestController
public class TaskController {

    private final TaskRepository taskRepository;
    private final JdbcTemplate jdbcTemplate;

    public TaskController(TaskRepository taskRepository, JdbcTemplate jdbcTemplate) {
        this.taskRepository = taskRepository;
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("")
    public List<Task> showAllTasks(){
        return taskRepository.findAll();
    }

    @PostMapping
    public void addTask(@RequestBody Task task){
        task.setCreatedAt(LocalDateTime.now());
        taskRepository.save(task);
    }

    @DeleteMapping("/{id}")
    public boolean deleteTask(@PathVariable Long id){
        if(!taskRepository.existsById(id))
            return false;
        else
            taskRepository.deleteById(id);
        return true;
    }

    @DeleteMapping("/all")
    public boolean deleteAllTasks(){
        if(taskRepository.count()<=0)
            return false;

        taskRepository.deleteAll();
        jdbcTemplate.execute("ALTER SEQUENCE task_id_seq RESTART WITH 1");
        return true;
    }

    //ResponseEntity ekle
}
