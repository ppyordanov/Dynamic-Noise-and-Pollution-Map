package com.springapp.mvc.models;

import javax.persistence.*;

/**
 * Created by Peter Yordanov on 14.10.2014 г..
 */

public class Route {

    @Id
    private String id;
    private String device_id;

    //default constructor
    public Route() {

        super();
        this.id = null;
        this.device_id = null;

    }

    //parameterized constructor
    public Route(String device_id) {
        this.id = null;
        this.device_id = device_id;
    }

    //copy constructor
    public Route(Route r) {
        this.id = null;
        this.device_id = r.getDevice_id();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDevice_id() {
        return device_id;
    }

    public void setDevice_id(String device_id) {
        this.device_id = device_id;
    }

    public String toString() {
        return this.device_id.toString();
    }

}
