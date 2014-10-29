package com.springapp.mvc.services;

import com.springapp.mvc.daos.DeviceDAO;
import com.springapp.mvc.models.Device;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by Peter Yordanov on 29.10.2014 г..
 */

@Service
public class DeviceService implements DeviceServiceInterface {

    @Autowired
    private DeviceDAO deviceDAO;
    private DeviceDAO deviceDAOInterface;

    public void setDeviceDAO(DeviceDAO deviceDAO){
        this.deviceDAO = deviceDAO;
    }

    @Override
    @Transactional
    public void addDevice(Device device){
        this.deviceDAO.addDevice(device);
    }

    @Override
    @Transactional
    public void updateDevice(Device device){
        this.deviceDAO.updateDevice(device);
    }

    @Override
    @Transactional
    public List<Device> getAll(){
        return this.deviceDAO.getAll();
    }

    @Override
    @Transactional
    public Device getDevice(Integer id){
        return this.deviceDAO.getDevice(id);
    }

    @Override
    @Transactional
    public void deleteDevice(Integer id){
        this.deviceDAO.deleteDevice(id);
    }

    public void setDeviceDAOInterface(DeviceDAO DeviceDAOInterface) {
        deviceDAOInterface = DeviceDAOInterface;
    }

    public DeviceDAO getDeviceDAOInterface() {
        return deviceDAOInterface;
    }
}
