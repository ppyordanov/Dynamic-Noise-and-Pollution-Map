package com.springapp.mvc.models;

import com.springapp.mvc.utilities.Constants;
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

        string.append(this.getClass().getName() + " Object {" + Constants.NEW_LINE);
        string.append("id: " + id + Constants.NEW_LINE);
        string.append("deviceId: " + deviceId + Constants.NEW_LINE);
        string.append("}" + Constants.NEW_LINE);

        return string.toString();

    }

}
