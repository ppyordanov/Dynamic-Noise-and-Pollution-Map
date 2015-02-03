package com.springapp.mvc.models;

import com.springapp.mvc.utilities.Constants;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

/**
 * Created by Peter Yordanov on 14.10.2014 г..
 */

@Document(collection = "DataReadings")
public class DataReading {

    @Id
    private String id;
    private String routeId;
    private String deviceId;

    private Date timestamp;
    private Double latitude;
    private Double longitude;
    private Double noise;
    private Double co;
    private Double no2;
    private Double battery;

    /*

    private Double humidity;
    private Double temperature;
    private Double light;
    private Double panel;
    private Double nets;

    */

    //default constructor
    public DataReading() {

        super();
        this.id = null;
        this.routeId = null;
        this.deviceId = null;
        this.timestamp = null;
        this.latitude = null;
        this.longitude = null;
        this.noise = null;
        this.co = null;
        this.no2 = null;
        this.battery = null;

    }

    //parameterized constructor
    public DataReading(String routeId, String deviceId, Date timestamp, Double latitude, Double longitude, Double noise, Double co, Double no2, Double battery) {
        this.id = null;
        this.routeId = routeId;
        this.deviceId = deviceId;
        this.timestamp = timestamp;
        this.latitude = latitude;
        this.longitude = longitude;
        this.noise = noise;
        this.co = co;
        this.no2 = no2;
        this.battery = battery;
    }

    //copy constructor
    public DataReading(DataReading dr) {

        this.id = null;
        this.routeId = dr.getRouteId();
        this.deviceId = dr.getDeviceId();
        this.timestamp = dr.getTimestamp();
        this.latitude = dr.getLatitude();
        this.longitude = dr.getLongitude();
        this.noise = dr.getNoise();
        this.co = dr.getCo();
        this.no2 = dr.getNo2();
        this.battery = dr.getBattery();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRouteId() {
        return routeId;
    }

    public void setRouteId(String routeId) {
        this.routeId = routeId;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getNoise() {
        return noise;
    }

    public void setNoise(Double noise) {
        this.noise = noise;
    }

    public Double getCo() {
        return co;
    }

    public void setCo(Double co) {
        this.co = co;
    }

    public Double getNo2() {
        return no2;
    }

    public void setNo2(Double no2) {
        this.no2 = no2;
    }

    public Double getBattery() {
        return battery;
    }

    public void setBattery(Double battery) {
        this.battery = battery;
    }

    public String toString() {

        StringBuilder string = new StringBuilder();

        string.append(this.getClass().getName() + " Object {" + Constants.NEW_LINE);
        string.append("id: " + id + Constants.NEW_LINE);
        string.append("routeId: " + routeId + Constants.NEW_LINE);
        string.append("deviceId: " + deviceId + Constants.NEW_LINE);
        string.append("timestamp: " + timestamp + Constants.NEW_LINE);
        string.append("latitude: " + latitude + Constants.NEW_LINE);
        string.append("longitude: " + longitude + Constants.NEW_LINE);
        string.append("noise: " + noise + Constants.NEW_LINE);
        string.append("co: " + co + Constants.NEW_LINE);
        string.append("no2: " + no2 + Constants.NEW_LINE);
        string.append("battery: " + battery + Constants.NEW_LINE);
        string.append("}" + Constants.NEW_LINE);

        return string.toString();

    }

}
