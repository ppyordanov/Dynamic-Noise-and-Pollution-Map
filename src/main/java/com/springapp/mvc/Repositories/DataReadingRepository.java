package com.springapp.mvc.repositories;

import com.springapp.mvc.models.DataReading;
import org.springframework.data.mongodb.repository.MongoRepository;


/**
 * Created by Peter Yordanov on 29.10.2014 г..
 */

public interface DataReadingRepository extends MongoRepository<DataReading, String> {

    public DataReading findByRouteId(String routeId);

    public DataReading findByDeviceId(String deviceId);

    public DataReading findByBattery(Double battery);


}
