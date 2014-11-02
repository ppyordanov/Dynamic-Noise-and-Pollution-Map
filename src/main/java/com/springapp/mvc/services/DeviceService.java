package com.springapp.mvc.services;

import com.springapp.mvc.models.Device;

import java.util.List;

/**
 * Created by Peter Yordanov on 29.10.2014 г..
 */
public interface DeviceService {

    public void addDevice(Device device);

    public void updateDevice(Device device);

    public List<Device> getAll();

    public Device getDevice(Integer id);

    public void deleteDevice(Integer id);

}
