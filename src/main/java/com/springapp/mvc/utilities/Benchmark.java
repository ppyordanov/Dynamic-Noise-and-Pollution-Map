package com.springapp.mvc.utilities;

import com.springapp.mvc.models.DataReading;
import com.springapp.mvc.models.Device;
import com.springapp.mvc.repositories.DataReadingRepository;
import com.springapp.mvc.repositories.DeviceRepository;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.concurrent.TimeUnit;

import static org.springframework.data.mongodb.core.query.Criteria.where;

/**
 * Created by Peter Yordanov on 8.11.2014 г..
 */

@Repository
public class Benchmark {


    /**
     * - mongoTemplate is used for data modification
     * - repositories provide  direct communication with the database
     * - startTime and endTime store operation execution times
     */

    private MongoTemplate mongoTemplate;
    private DataReadingRepository dataReadingRepository;
    private DeviceRepository deviceRepository;

    private long startTime;
    private long endTime;
    private String executionTimeResult;

    public void setDataReadingRepository(DataReadingRepository dataReadingRepository) {
        this.dataReadingRepository = dataReadingRepository;
    }

    public void setMongoTemplate(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public void setDeviceRepository(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }


    //function to format execution time milliseconds => min, sec, millisec

    /**
     * @param startTime used to measure operation start time in system clock milliseconds
     * @param endTime   used to measure operation end time
     * @return a formatted string, showing execution time in minutes, seconds and milliseconds
     */
    public String taskDuration(long startTime, long endTime) {

        long insertionDuration = endTime - startTime;


        long minutes = TimeUnit.MILLISECONDS.toMinutes(insertionDuration);
        long seconds = TimeUnit.MILLISECONDS.toSeconds(insertionDuration) - TimeUnit.MINUTES.toSeconds(minutes);
        long milliseconds = insertionDuration - (TimeUnit.SECONDS.toMillis(seconds) + TimeUnit.MINUTES.toMillis(minutes));


        String result = String.format("Execution time: %d min, %d sec, %d millisec",
                minutes,
                seconds,
                milliseconds
        );

        return result;

    }

    // records is the insertion amount 1 corresponds to 5 000 insertions of data

    /**
     * @param dataReadings a list of DataReading objects to be inserted in the database
     * @param records      number of iterations over the list, 1 would mean 1*dataReadings.size() insertions
     * @return preformatted task duration string
     */
    public String insertRealDataBenchmark(List<DataReading> dataReadings, int records) {

        startTime = System.currentTimeMillis();
        for (int i = 0; i < records; i++) {
            for (DataReading dataReading : dataReadings) {

                if (dataReading.getId() != null) {
                    dataReading.setId(null);
                }
                dataReadingRepository.save(dataReading);
            }
        }
        endTime = System.currentTimeMillis();
        executionTimeResult = taskDuration(startTime, endTime);

        return executionTimeResult;

    }

    /**
     * update a single record in the DataReadings collection
     *
     * @return update operation execution time
     */
    public String updateSingleBenchmark() {

        startTime = System.currentTimeMillis();
        Query query = new Query(where("battery").is(100));
        mongoTemplate.updateFirst(query, Update.update("noise", 999), DataReading.class);
        endTime = System.currentTimeMillis();
        executionTimeResult = taskDuration(startTime, endTime);

        return executionTimeResult;
    }

    /**
     * retrieve all of the records in the DataReadings collection
     *
     * @return retrieval operation execution time
     */
    public String getAllBenchmark() {

        startTime = System.currentTimeMillis();
        List<DataReading> dataReadings = dataReadingRepository.findAll();
        endTime = System.currentTimeMillis();
        executionTimeResult = taskDuration(startTime, endTime);

        return executionTimeResult;
    }

    /**
     * retrieve a single data reading from the relevant collection
     *
     * @return retrieval operation execution time
     */
    public String getSingleBenchmark() {

        startTime = System.currentTimeMillis();
        DataReading dataReading = dataReadingRepository.findByBattery(66.3);
        endTime = System.currentTimeMillis();
        executionTimeResult = taskDuration(startTime, endTime);

        return executionTimeResult;
    }

    /**
     * delete a single data reading record from DataReadings collection
     *
     * @return delete operation execution time
     */
    public String deleteSingleBenchmark() {

        startTime = System.currentTimeMillis();
        dataReadingRepository.delete(dataReadingRepository.findByBattery(66.2));
        endTime = System.currentTimeMillis();
        executionTimeResult = taskDuration(startTime, endTime);

        return executionTimeResult;
    }

    /**
     * insert a single device record in Devices collection
     *
     * @return single insertion execution time
     */
    public String insertSingleBenchmark() {

        startTime = System.currentTimeMillis();
        deviceRepository.save(new Device("horse", "horse", "horse", "horse"));
        endTime = System.currentTimeMillis();
        executionTimeResult = taskDuration(startTime, endTime);

        return executionTimeResult;

    }

}
