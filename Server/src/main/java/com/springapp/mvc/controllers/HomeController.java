package com.springapp.mvc.controllers;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.springapp.mvc.models.DataReading;
import com.springapp.mvc.models.Route;
import com.springapp.mvc.repositories.DataReadingRepository;
import com.springapp.mvc.repositories.DeviceRepository;
import com.springapp.mvc.repositories.RouteRepository;
import com.springapp.mvc.utilities.Benchmark;
import com.springapp.mvc.utilities.DataPopulation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletContext;
import java.lang.reflect.Type;
import java.util.List;

@Controller
@RequestMapping("/")
public class HomeController {


    @Autowired(required = true)
    private DataReadingRepository dataReadingRepository;
    @Autowired
    MongoTemplate mongoTemplate;
    @Autowired(required = true)
    private RouteRepository routeRepository;
    @Autowired(required = true)
    private DeviceRepository deviceRepository;

    private
    @Autowired
    ServletContext servletContext;

    private static final Logger LOGGER = LoggerFactory.getLogger(HomeController.class);

    private static final String MESSAGE = "message";
    private static final String HOME = "home";
    private static final String SAMPLE_DATA = "/resources/SAMPLE_DATA/sample_data.json";
    private static final String MAPPING_DATA = "/data";
    private static final String DATA_READINGS = "dataReadings";
    private static final String INSERT_SINGLE = "insertSingle";
    private static final String INSERT_REAL_DATA = "insertRealData";
    private static final String UPDATE_SINGLE = "updateSingle";
    private static final String GET_SINGLE = "getSingle";
    private static final String DELETE_SINGLE = "deleteSingle";
    private static final String GET_ALL = "getAll";
    private static final String REAL_DATA_SIZE = "realDataSize";
    private static final String TOTAL_TIME = "totalTime";


    private DataPopulation dataPopulation = new DataPopulation();
    private Benchmark benchmark;


    @RequestMapping(method = RequestMethod.GET)
    public String home(ModelMap model) {

        List<DataReading> dataReadings = dataReadingRepository.findAll();
        List<Route> routes = routeRepository.findAll();

        model.addAttribute("dataReadingModels", dataReadings);
        model.addAttribute("routeModels", routes);

        LOGGER.info("Data readings in the database: " + dataReadings.size());
        return HOME;
    }


    @RequestMapping(value = "/del")
    public
    @ResponseBody
    String truncate() {

        dataReadingRepository.deleteAll();
        routeRepository.deleteAll();
        return "done";
    }


    @RequestMapping(value = "/addRoute", method = RequestMethod.POST)
    public
    @ResponseBody
    String addRoute(@RequestParam("json") String json) {
        //save new route
        Route newRoute = new Route();
        routeRepository.save(newRoute);

        //save data reading
        Type listType = new TypeToken<List<DataReading>>() {
        }.getType();
        List<DataReading> data = new Gson().fromJson(json, listType);

        //DataReading dr = new Gson().fromJson(json,DataReading.class);
        LOGGER.info("Route saved: " + newRoute);
        LOGGER.info("ds" + data.size());
        for (DataReading dr : data) {

            dr.setRouteId(newRoute.getId());
            /*
            Map<String, Double> position = dataPopulation.randomPosGen(Constants.MIN_LAT_BOUNDS, Constants.MAX_LAT_BOUNDS, Constants.MIN_LON_BOUNDS, Constants.MAX_LON_BOUNDS);
            dr.setLatitude(position.get("latitude"));
            dr.setLongitude(position.get("longitude"));
            */

            dataReadingRepository.save(dr);
            LOGGER.info("Data reading saved: " + dr);
        }

        return "success";
    }

    /*
    @RequestMapping(value = "/addRoute" , method = RequestMethod.GET)
    public @ResponseBody
    String save(@RequestBody String jsonString) {
        //Route route = routeRepository.save(jsonString);

        dataReadingRepository.deleteAll();

        System.out.println(jsonString);
        LOGGER.info(jsonString);

        return jsonString;
    }

    */

    /*
    @RequestMapping(value = MAPPING_DATA)
    public String dataPopulation(ModelMap model) {

        benchmark = new Benchmark();

        benchmark.setDataReadingRepository(dataReadingRepository);
        benchmark.setDeviceRepository(deviceRepository);
        benchmark.setMongoTemplate(mongoTemplate);

        InputStream JSONresource = servletContext.getResourceAsStream(SAMPLE_DATA);
        List<DataReading> dataReadings = dataPopulation.loadModels(JSONresource);

        routeRepository.deleteAll();
        deviceRepository.deleteAll();
        dataReadingRepository.deleteAll();


        int SIZE = 1;

        long startTime = System.currentTimeMillis();

        String insertSingleBenchmarkResult = benchmark.insertSingleBenchmark();
        String insertRealDataBenchmarkResult = benchmark.insertRealDataBenchmark(dataReadings, SIZE);
        String getSingleBenchmarkResult = benchmark.getSingleBenchmark();
        String updateSingleBenchmarkResult = benchmark.updateSingleBenchmark();
        String deleteSingleBenchmarkResult = benchmark.deleteSingleBenchmark();
        String getAllBenchmarkResult = benchmark.getAllBenchmark();

        long endTime = System.currentTimeMillis();

        String totalTime = benchmark.taskDuration(startTime, endTime);

        model.addAttribute(DATA_READINGS, dataReadings);

        model.addAttribute(INSERT_SINGLE, insertSingleBenchmarkResult);
        model.addAttribute(INSERT_REAL_DATA, insertRealDataBenchmarkResult);
        model.addAttribute(UPDATE_SINGLE, updateSingleBenchmarkResult);
        model.addAttribute(GET_SINGLE, getSingleBenchmarkResult);
        model.addAttribute(DELETE_SINGLE, deleteSingleBenchmarkResult);

        model.addAttribute(GET_ALL, getAllBenchmarkResult);
        model.addAttribute(REAL_DATA_SIZE, SIZE);
        model.addAttribute(TOTAL_TIME, totalTime);

        return "data";
    }

    */
}