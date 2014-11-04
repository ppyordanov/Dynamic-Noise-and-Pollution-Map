package com.springapp.mvc.repositories;

import com.springapp.mvc.models.DataReading;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.MongoRepository;


/**
 * Created by Peter Yordanov on 29.10.2014 г..
 */

@Document(collection = "DataReading")
public interface DataReadingRepository extends MongoRepository<DataReading, String> {

    public DataReading findByRouteId(String route_id);
    public DataReading findByDeviceId(String device_id);
    public DataReading findByBattery(Double battery);



}
