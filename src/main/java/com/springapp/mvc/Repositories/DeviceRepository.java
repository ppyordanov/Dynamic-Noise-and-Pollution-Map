package com.springapp.mvc.repositories;

import com.springapp.mvc.models.Device;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.MongoRepository;


/**
 * Created by Peter Yordanov on 29.10.2014 г..
 */

@Document(collection = "Devices")
public interface DeviceRepository extends MongoRepository<Device, String> {

    //public Device findByDeviceTitle(String title);

}
