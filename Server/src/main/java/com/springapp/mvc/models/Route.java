package com.springapp.mvc.models;

import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

/**
 * Created by Peter Yordanov on 14.10.2014 г..
 */

@Document(collection = "Routes")
public class Route {

    @Id
    private String id;
    private String deviceId;

    //default constructor
    public Route() {

        super();
        this.id = null;
        this.deviceId = null;

    }

    //parameterized constructor
    public Route(String deviceId) {
        this.id = null;
        this.deviceId = deviceId;
    }

    //copy constructor
    public Route(Route r) {
        this.id = null;
        this.deviceId = r.getDeviceId();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public String toString() {


        StringBuilder string = new StringBuilder();
        String newLine = System.getProperty("line.separator");

        string.append(this.getClass().getName() + " Object {" + newLine);
        string.append("id: " + id + newLine);
        string.append("deviceId: " + deviceId + newLine);
        return string.toString();

    }

}
