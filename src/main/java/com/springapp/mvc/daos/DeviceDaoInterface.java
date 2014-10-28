package com.springapp.mvc.daos;

import com.springapp.mvc.models.Device;
import java.util.List;


/**
 * Created by Peter Yordanov on 28.10.2014 г..
 */



public interface DeviceDaoInterface {

    public void addDevice(Device device);
    public void updateDevice(Device device);
    public List<Device> getAll();
    public Device getDevice(int id);
    public void deleteDevice(int id);

}
