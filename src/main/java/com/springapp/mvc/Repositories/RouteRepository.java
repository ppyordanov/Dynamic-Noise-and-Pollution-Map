package com.springapp.mvc.repositories;

import com.springapp.mvc.models.Route;
import org.springframework.data.mongodb.repository.MongoRepository;


/**
 * Created by Peter Yordanov on 29.10.2014 г..
 */

public interface RouteRepository extends MongoRepository<Route, String> {

    public Route findByDeviceId(String deviceId);


}
