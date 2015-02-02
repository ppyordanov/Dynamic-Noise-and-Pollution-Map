package com.springapp.mvc.repositories;

import com.springapp.mvc.models.Device;
import org.springframework.data.mongodb.repository.MongoRepository;


/**
 * Created by Peter Yordanov on 29.10.2014 г..
 */

public interface DeviceRepository extends MongoRepository<Device, String> {

    public Device findByTitle(String title);

    public Device findByDescription(String description);

    public Device findByKitVersion(String kitVersion);

}
