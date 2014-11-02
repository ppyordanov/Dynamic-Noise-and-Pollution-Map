package com.springapp.mvc.daos;

import com.springapp.mvc.models.Device;

import java.util.List;


/**
 * Created by Peter Yordanov on 28.10.2014 г..
 */


public interface DeviceDAO {

    public void addDevice(Device device);

    public void updateDevice(Device device);

    public List<Device> getAll();

    public Device getDevice(Integer id);

    public void deleteDevice(Integer id);

}
