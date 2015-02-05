package com.springapp.mvc;

import com.springapp.mvc.models.DataReading;
import com.springapp.mvc.models.Device;
import com.springapp.mvc.models.Route;
import com.springapp.mvc.models.User;
import com.springapp.mvc.repositories.DataReadingRepository;
import com.springapp.mvc.repositories.DeviceRepository;
import com.springapp.mvc.repositories.RouteRepository;
import com.springapp.mvc.repositories.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import java.util.Date;

import static junit.framework.Assert.assertEquals;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration("file:src/main/webapp/WEB-INF/mvc-dispatcher-servlet.xml")
public class ModelsTests {


    @SuppressWarnings("SpringJavaAutowiringInspection")

    @Autowired(required = true)
    private DataReadingRepository dataReadingRepository;
    @Autowired
    MongoTemplate mongoTemplate;
    @Autowired(required = true)
    private DeviceRepository deviceRepository;
    @Autowired(required = true)
    private UserRepository userRepository;
    @Autowired(required = true)
    private RouteRepository routeRepository;

    private Route route;
    private DataReading dataReading;
    private Device device;
    private Device setupSavedDevice;
    private User user;

    private long routeNumber;
    private long dataReadingNumber;
    private long deviceNumber;
    private long userNumber;

    private long currentDocumentsNumber;
    private DataReading currentDataReading;
    private DataReading savedDataReading;
    private double batteryValue;

    private User currentUser;
    private User savedUser;
    private String userNameValue;

    private Device currentDevice;
    private Device savedDevice;

    private Route currentRoute;
    private Route savedRoute;
    private String deviceIdValue;
    private String descriptionValue;

    @Before
    public void setup() {
       //set up tests
        route = new Route();
        dataReading = new DataReading(null, null, new Date(), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0);
        device = new Device("SCK", "description", "kit version", "Glasgow", null, new Date());
        user = new User("user", "Glasgow", "United Kingdon", "http://ppyordanov.com", "email.com", new Date());
        setupSavedDevice = new Device("SCK 2.0", "description", "2.1", "London", null, new Date());
        setupSavedDevice = deviceRepository.save(setupSavedDevice);

        routeNumber = routeRepository.count();
        dataReadingNumber = dataReadingRepository.count();
        deviceNumber = deviceRepository.count();
        userNumber = userRepository.count();

        batteryValue = 100.0;
        userNameValue = "ppyordanov";
        deviceIdValue = setupSavedDevice.getId();
        descriptionValue = "new description";

    }


    @Test
    public void dataReadingInsertTest() throws Exception {

        dataReadingRepository.save(dataReading);
        currentDocumentsNumber = dataReadingRepository.count();
        assertEquals(dataReadingNumber+1, currentDocumentsNumber);
        dataReadingRepository.delete(dataReading);

    }

    @Test
    public void dataReadingUpdateTest() throws Exception {

        dataReadingRepository.save(dataReading);
        currentDataReading = dataReadingRepository.findById(dataReading.getId());
        currentDataReading.setBattery(batteryValue);
        savedDataReading = dataReadingRepository.save(currentDataReading);
        assertEquals(batteryValue, savedDataReading.getBattery());

        dataReadingRepository.delete(savedDataReading);

    }

    @Test
    public void dataReadingDeleteTest() throws Exception {
        dataReadingRepository.save(dataReading);
        dataReadingRepository.delete(dataReading);
        currentDocumentsNumber = dataReadingRepository.count();
        assertEquals(dataReadingNumber, currentDocumentsNumber);
    }


    @Test
    public void userInsertTest() throws Exception {

        userRepository.save(user);
        currentDocumentsNumber = userRepository.count();
        assertEquals(userNumber+1, currentDocumentsNumber);
        userRepository.delete(user);

    }

    @Test
    public void userUpdateTest() throws Exception {

        userRepository.save(user);
        currentUser = userRepository.findById(user.getId());
        currentUser.setUserName(userNameValue);
        savedUser = userRepository.save(currentUser);
        assertEquals(userNameValue, savedUser.getUserName());
        userRepository.delete(savedUser);

    }

    @Test
    public void userDeleteTest() throws Exception {
        userRepository.save(user);
        userRepository.delete(user);
        currentDocumentsNumber = userRepository.count();
        assertEquals(userNumber, currentDocumentsNumber);
    }



    @Test
    public void routeInsertTest() throws Exception {

        routeRepository.save(route);
        currentDocumentsNumber = routeRepository.count();
        assertEquals(routeNumber+1, currentDocumentsNumber);
        routeRepository.delete(route);

    }

    @Test
    public void routeUpdateTest() throws Exception {

        routeRepository.save(route);
        currentRoute= routeRepository.findById(route.getId());
        currentRoute.setDeviceId(setupSavedDevice.getId());
        savedRoute = routeRepository.save(currentRoute);
        assertEquals(deviceIdValue, savedRoute.getDeviceId());
        routeRepository.delete(savedRoute);

    }

    @Test
    public void routeDeleteTest() throws Exception {
        routeRepository.save(route);
        routeRepository.delete(route);
        currentDocumentsNumber = routeRepository.count();
        assertEquals(routeNumber, currentDocumentsNumber);
    }

    @Test
    public void deviceInsertTest() throws Exception {

        Device deviceId = deviceRepository.save(device);
        currentDocumentsNumber = deviceRepository.count();
        assertEquals(deviceNumber+1, currentDocumentsNumber);
        deviceRepository.delete(deviceId);

    }

    @Test
    public void deviceUpdateTest() throws Exception {

        deviceRepository.save(device);
        currentDevice = deviceRepository.findById(device.getId());
        currentDevice.setDescription(descriptionValue);
        savedDevice = deviceRepository.save(currentDevice);
        assertEquals(descriptionValue, savedDevice.getDescription());
        deviceRepository.delete(savedDevice);

    }

    @Test
    public void deviceDeleteTest() throws Exception {
        deviceRepository.save(device);
        deviceRepository.delete(device);
        currentDocumentsNumber = deviceRepository.count();
        assertEquals(deviceNumber, currentDocumentsNumber);
    }

}
