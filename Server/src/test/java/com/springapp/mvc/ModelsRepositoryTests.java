package com.springapp.mvc;

import com.springapp.mvc.models.DataReading;
import com.springapp.mvc.models.Device;
import com.springapp.mvc.models.Route;
import com.springapp.mvc.models.User;
import com.springapp.mvc.repositories.DataReadingRepository;
import com.springapp.mvc.repositories.DeviceRepository;
import com.springapp.mvc.repositories.RouteRepository;
import com.springapp.mvc.repositories.UserRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import static junit.framework.Assert.assertEquals;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration("file:src/main/webapp/WEB-INF/mvc-dispatcher-servlet.xml")
public class ModelsRepositoryTests {


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
    private DataReading setupSavedDataReading;
    private double batteryValue;

    private User currentUser;
    private User savedUser;
    private User setupSavedUser;
    private String userNameValue;

    private Device currentDevice;
    private Device savedDevice;

    private Route currentRoute;
    private Route savedRoute;
    private Route setupSavedRoute;
    private String deviceIdValue;
    private String descriptionValue;

    private DataReading foundDataReading;
    private Route foundRoute;
    private Device foundDevice;
    private User foundUser;

    @Before
    public void setup() {
        //set up tests
        route = new Route();
        device = new Device("SCK", "description", "kit version", "Glasgow", null, null);
        dataReading = new DataReading(null, null, null, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0);
        user = new User("user", "Glasgow", "United Kingdom", "http://ppyordanov.com", "email.com", null);
        setupSavedUser = new User("userSetup", "London", "United Kingdom", "website", "email", null);
        userRepository.save(setupSavedUser);
        setupSavedDevice = new Device("SCK 2.0", "description", "2.1", "London", setupSavedUser.getId(), null);
        setupSavedDevice = deviceRepository.save(setupSavedDevice);
        setupSavedRoute = new Route(setupSavedDevice.getId());
        routeRepository.save(setupSavedRoute);
        setupSavedDataReading = new DataReading(setupSavedRoute.getId(), setupSavedDevice.getId(), null, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0);
        dataReadingRepository.save(setupSavedDataReading);

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
    public void dataReadingFindByRouteIdTest() throws Exception {
        foundDataReading = dataReadingRepository.findByRouteId(setupSavedDataReading.getRouteId());
        assertEquals(setupSavedDataReading.getId(), foundDataReading.getId());
    }

    @Test
    public void dataReadingFindByDeviceIdTest() throws Exception {
        foundDataReading = dataReadingRepository.findByDeviceId(setupSavedDataReading.getDeviceId());
        assertEquals(setupSavedDataReading.getId(), foundDataReading.getId());
    }

    @Test
    public void dataReadingFindByIdTest() throws Exception {
        foundDataReading = dataReadingRepository.findById(setupSavedDataReading.getId());
        assertEquals(setupSavedDataReading.getDeviceId(), foundDataReading.getDeviceId());
        assertEquals(setupSavedDataReading.getNoise(), foundDataReading.getNoise());
        assertEquals(setupSavedDataReading.getCo(), foundDataReading.getCo());
        assertEquals(setupSavedDataReading.getNo2(), foundDataReading.getNo2());
    }


    @Test
    public void dataReadingInsertTest() throws Exception {

        dataReadingRepository.save(dataReading);
        currentDocumentsNumber = dataReadingRepository.count();
        assertEquals(dataReadingNumber + 1, currentDocumentsNumber);
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
    public void userFindByIdTest() throws Exception {
        foundUser = userRepository.findById(setupSavedUser.getId());
        assertEquals(setupSavedUser.getUserName(), foundUser.getUserName());
    }

    @Test
    public void userInsertTest() throws Exception {

        userRepository.save(user);
        currentDocumentsNumber = userRepository.count();
        assertEquals(userNumber + 1, currentDocumentsNumber);
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
    public void routeFindByDeviceIdTest() throws Exception {
        foundRoute = routeRepository.findByDeviceId(setupSavedRoute.getDeviceId());
        assertEquals(setupSavedRoute.getId(), foundRoute.getId());
    }

    @Test
    public void routeFindByIdTest() throws Exception {
        foundRoute = routeRepository.findById(setupSavedRoute.getId());
        assertEquals(setupSavedRoute.getDeviceId(), foundRoute.getDeviceId());
    }

    @Test
    public void routeInsertTest() throws Exception {

        routeRepository.save(route);
        currentDocumentsNumber = routeRepository.count();
        assertEquals(routeNumber + 1, currentDocumentsNumber);
        routeRepository.delete(route);

    }

    @Test
    public void routeUpdateTest() throws Exception {

        routeRepository.save(route);
        currentRoute = routeRepository.findById(route.getId());
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
    public void deviceFindByIdTest() throws Exception {
        foundDevice = deviceRepository.findById(setupSavedDevice.getId());
        assertEquals(setupSavedDevice.getTitle(), foundDevice.getTitle());
        assertEquals(setupSavedDevice.getDescription(), foundDevice.getDescription());
        assertEquals(setupSavedDevice.getLocation(), foundDevice.getLocation());
    }

    @Test
    public void deviceInsertTest() throws Exception {

        Device deviceId = deviceRepository.save(device);
        currentDocumentsNumber = deviceRepository.count();
        assertEquals(deviceNumber + 1, currentDocumentsNumber);
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

    @After
    public void tearDown() {
        dataReadingRepository.delete(setupSavedDataReading);
        routeRepository.delete(setupSavedRoute);
        deviceRepository.delete(setupSavedDevice);
        userRepository.delete(setupSavedUser);
    }
}
