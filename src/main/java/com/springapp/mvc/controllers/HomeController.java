package com.springapp.mvc.controllers;

import com.springapp.mvc.models.DataReading;
import com.springapp.mvc.repositories.DataReadingRepository;
import com.springapp.mvc.repositories.DeviceRepository;
import com.springapp.mvc.repositories.RouteRepository;
import com.springapp.mvc.utilities.Benchmark;
import com.springapp.mvc.utilities.DataPopulation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.ServletContext;
import java.io.InputStream;
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


    private DataPopulation dataPopulation;
    private Benchmark benchmark;


    @RequestMapping(method = RequestMethod.GET)
    public String printWelcome(ModelMap model) {

        model.addAttribute(MESSAGE, "Hello world!");


        return HOME;
    }

    @RequestMapping(value = MAPPING_DATA)
    public String dataPopulation(ModelMap model) {

        dataPopulation = new DataPopulation();
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


}