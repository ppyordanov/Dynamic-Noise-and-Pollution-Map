package com.springapp.mvc.models;

import com.springapp.mvc.utilities.Constants;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

/**
 * Created by Peter Yordanov on 19.10.2014 г..
 */
@Document(collection = "Users")
public class User {

    @Id
    private String id;
    private String userName;
    private String city;
    private String country;
    private String website;
    private String email;
    private String created;

    //default constructor
    public User() {

        this.id = null;
        this.userName = null;
        this.city = null;
        this.country = null;
        this.website = null;
        this.email = null;
        this.created = null;
    }
    //parameterized constructor
    public User(String userName, String city, String country, String website, String email, String created) {

        this.id = null;
        this.userName = userName;
        this.city = city;
        this.country = country;
        this.website = website;
        this.email = email;
        this.created = created;
    }


    //copy constructor
    public User(User r) {
        this.id = r.getId();
        this.userName = r.getUserName();
        this.city = r.getCity();
        this.country = r.getCountry();
        this.website = r.getWebsite();
        this.email = r.getEmail();
        this.created = r.getCreated();
    }

    public String getId() {
        return id;
    }

    public void setid(String id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCreated() {
        return created;
    }

    public void setCreated(String created) {
        this.created = created;
    }

    public String toString() {

        StringBuilder string = new StringBuilder();

        string.append(this.getClass().getName() + " Object {" + Constants.NEW_LINE);
        string.append("id: " + id +  Constants.NEW_LINE);
        string.append("Name: " + userName +  Constants.NEW_LINE);
        string.append("City: " + city +  Constants.NEW_LINE);
        string.append("Country: " + country +  Constants.NEW_LINE);
        string.append("Website: " + website +  Constants.NEW_LINE);
        string.append("Email: " + email +  Constants.NEW_LINE);
        string.append("Created: " + created +  Constants.NEW_LINE);
        string.append("}" +  Constants.NEW_LINE);

        return string.toString();

    }

}
