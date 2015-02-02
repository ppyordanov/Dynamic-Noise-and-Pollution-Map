package com.springapp.mvc.repositories;

import com.springapp.mvc.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by Peter Yordanov on 1.2.2015 г..
 */
public interface UserRepository extends MongoRepository<User, String> {

    public User findById(String id);

}
