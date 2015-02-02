package com.springapp.mvc.models;

import com.springapp.mvc.utilities.Constants;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.util.Date;

/**
 * Created by Peter Yordanov on 19.10.2014 г..
 */

@Document(collection = "Devices")
public class Device {

    @Id
    private String id;
    private String title;
    private String description;
    private String kitVersion;
    private String location;
    private Date created;
    private String userId;

    //default constructor
    public Device() {

        super();
        this.id = null;
        this.title = null;
        this.description = null;
        this.kitVersion = null;
        this.location = null;
        this.userId= null;
        this.created = null;

    }

    //parameterized constructor
    public Device(String title, String description, String kitVersion, String location, String userId, Date created) {
        this.id = null;
        this.title = title;
        this.description = description;
        this.kitVersion = kitVersion;
        this.location = location;
        this.userId = userId;
        this.created = created;
    }

    //copy constructor
    public Device(Device d) {
        this.id = null;
        this.title = d.getTitle();
        this.description = d.getDescription();
        this.kitVersion = d.getKitVersion();
        this.location = d.getlocation();
        this.userId = d.getUserId();
        this.created = d.getCreated();


    }

    public String getlocation() {
        return location;
    }

    public void setlocation(String location) {
        this.location = location;
    }

    public String getKitVersion() {
        return kitVersion;
    }

    public void setKitVersion(String kitVersion) {
        this.kitVersion = kitVersion;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }


    @Override
    public String toString() {

        StringBuilder string = new StringBuilder();

        string.append(this.getClass().getName() + " Object {" + Constants.NEW_LINE);
        string.append("id: " + id + Constants.NEW_LINE);
        string.append("title: " + title + Constants.NEW_LINE);
        string.append("description: " + description + Constants.NEW_LINE);
        string.append("kitVersion: " + kitVersion + Constants.NEW_LINE);
        string.append("location: " + location + Constants.NEW_LINE);
        string.append("created: " + created + Constants.NEW_LINE);
        string.append("userId: " + userId + Constants.NEW_LINE);
        string.append("}" + Constants.NEW_LINE);

        return string.toString();

    }
}
