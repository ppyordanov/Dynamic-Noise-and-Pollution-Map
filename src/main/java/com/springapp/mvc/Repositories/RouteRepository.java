package com.springapp.mvc.repositories;

import com.springapp.mvc.models.Route;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.MongoRepository;


/**
 * Created by Peter Yordanov on 29.10.2014 г..
 */

@Document(collection = "Routes")
public interface RouteRepository extends MongoRepository<Route, String> {

    //public Route findByDevice_Id(int id);

}
