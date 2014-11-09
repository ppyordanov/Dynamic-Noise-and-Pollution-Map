package com.springapp.mvc.utilities;

import com.owlike.genson.Genson;
import com.springapp.mvc.models.DataReading;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.InputStream;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Peter Yordanov on 1.11.2014 г..
 */
public class DataPopulation {

    private static final Logger LOGGER = LoggerFactory.getLogger(DataPopulation.class);

    //v2 translated from t.js
    public Map<String, Double> randomPosGen(Double minLatBounds, Double maxLatBounds, Double minLonBounds, Double maxLonBounds) {

        Map<String, Double> position = new HashMap<String, Double>();

        Integer multiplier = 1000000;
        Double lat = Math.random() * ((maxLatBounds - minLatBounds) * multiplier) + minLatBounds * multiplier;
        Double lon = Math.random() * ((maxLonBounds - minLonBounds) * multiplier) + minLonBounds * multiplier;

        position.put("latitude", lat / multiplier);
        position.put("longitude", lon / multiplier);


        return position;

    }

    public List<DataReading> loadModels(InputStream JSONresource) {

        Object[] readings = null;
        Map<String, Object> map = null;
        Map<String, Object> reading = null;
        Map<String, Double> position = null;
        List<DataReading> dataReadings = new ArrayList<DataReading>();

        DataReading dataReading = null;

        String route_id = null, device_id = null;
        Timestamp timestamp;
        Double latitude = null, longitude = null, noise, co, no2, battery;


        map = new Genson().deserialize(JSONresource, Map.class);
        readings = (Object[]) map.get("data");


        LOGGER.info("Readings loaded from file: " + readings.length);


        for (Object o : readings) {

            reading = (Map<String, Object>) o;

            timestamp = null;

            noise = Double.parseDouble(reading.get("noise").toString());
            co = Double.parseDouble(reading.get("co").toString());
            no2 = Double.parseDouble(reading.get("no2").toString());
            battery = Double.parseDouble(reading.get("bat").toString());

            position = randomPosGen(Constants.MIN_LAT_BOUNDS, Constants.MAX_LAT_BOUNDS, Constants.MIN_LON_BOUNDS, Constants.MAX_LON_BOUNDS);

            latitude = position.get("latitude");
            longitude = position.get("longitude");

            dataReading = new DataReading(route_id, device_id, timestamp, latitude, longitude, noise, co, no2, battery);


            dataReadings.add(dataReading);


        }

        return dataReadings;

    }


}
