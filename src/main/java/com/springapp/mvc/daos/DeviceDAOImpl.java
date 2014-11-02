package com.springapp.mvc.daos;

import com.springapp.mvc.models.Device;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Created by Peter Yordanov on 28.10.2014 г..
 */
@Repository
public class DeviceDAOImpl implements DeviceDAO {

    private static final Logger LOGGER = LoggerFactory.getLogger(DeviceDAOImpl.class);
    private Session currentSession;

    private SessionFactory sessionFactory;

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public void addDevice(Device device) {
        currentSession = this.sessionFactory.getCurrentSession();
        currentSession.persist(device);

        LOGGER.info("Device added: /n" + device);
    }

    @Override
    public void updateDevice(Device device) {
        currentSession = this.sessionFactory.getCurrentSession();
        currentSession.update(device);

        LOGGER.info("Device updated: /n" + device);
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<Device> getAll() {
        currentSession = this.sessionFactory.getCurrentSession();
        List<Device> deviceList = currentSession.createQuery("from DEVICE").list();

        for (Device device : deviceList) {
            LOGGER.info("Device list: " + device);
        }

        return deviceList;
    }

    @Override
    public Device getDevice(Integer id) {
        currentSession = this.sessionFactory.getCurrentSession();
        Device device = (Device) currentSession.load(Device.class, id);

        LOGGER.info("Device retrieved: " + device);

        return device;
    }

    @Override
    public void deleteDevice(Integer id) {
        currentSession = this.sessionFactory.getCurrentSession();
        Device device = (Device) currentSession.load(Device.class, id);

        if (!device.equals(null)) {
            currentSession.delete(device);
        }

        LOGGER.info("Device deleted: " + device);
    }
}
