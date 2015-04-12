package com.springapp.mvc;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration("file:src/main/webapp/WEB-INF/mvc-dispatcher-servlet.xml")
public class ControllersTests {
    private MockMvc mockMvc;

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    protected WebApplicationContext wac;

    protected String userJSON;
    protected String context;
    protected String deviceJSON;

    @Before
    public void setup() {
        this.mockMvc = webAppContextSetup(this.wac).build();

        userJSON = "{\n" +
                "me: {\n" +
                "id: \"1\",\n" +
                "username: \"UN\",\n" +
                "city: \"C\",\n" +
                "country: \"C\",\n" +
                "website: \"W\",\n" +
                "email: \"W\",\n" +
                "created: \"C\"\n" +
                "}}";
        context = "[{\n" +
                "\n" +
                "no2: \"1\",\n" +
                "co: \"1\",\n" +
                "noise: \"1\",\n" +
                "battery: \"1\",\n" +
                "latitude: \"1\",\n" +
                "longitude: \"1\",\n" +
                "routeId: \"1\",\n" +
                "timestamp: \"1\",\n" +
                "light: \"1\",\n" +
                "hum: \"1\",\n" +
                "temp: \"1\"\n" +
                "}]";
        deviceJSON = "{\n" +
                "devices: [\n" +
                "{\n" +
                "id: \"1\",\n" +
                "title: \"T\",\n" +
                "description: \"D\",\n" +
                "location: \"L\",\n" +
                "created: \"C\",\n" +
                "kit_version: \"KV\"\n" +
                "}\n" +
                "]}";
    }

    @Test
    public void homeSuccessTest() throws Exception {
        mockMvc.perform(get("/"))
                .andExpect(status().isOk())
                .andExpect(view().name("home"));
    }

    //successful insertion test
    //@Test
    public void routeSuccessTest() throws Exception {
        mockMvc.perform(post("/addRoute").contentType(MediaType.APPLICATION_JSON)
                .param("context", context)
                .param("user", userJSON)
                .param("device", deviceJSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    //no request structure
    @Test
    public void routeFailTestBadStructure() throws Exception {
        mockMvc.perform(get("/addRoute"))
                .andExpect(status().is4xxClientError());
    }

    @Test
    public void routeFailTestInvalidDeviceData() throws Exception {
        deviceJSON = null;
        mockMvc.perform(post("/addRoute").contentType(MediaType.APPLICATION_JSON)
                .param("context", context)
                .param("user", userJSON)
                .param("device", deviceJSON))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    public void routeFailTestInvalidUserData() throws Exception {
        userJSON = null;
        mockMvc.perform(post("/addRoute").contentType(MediaType.APPLICATION_JSON)
                .param("context", context)
                .param("user", userJSON)
                .param("device", deviceJSON))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    public void routeFailTestInvalidContextData() throws Exception {
        context = null;
        mockMvc.perform(post("/addRoute").contentType(MediaType.APPLICATION_JSON)
                .param("context", context)
                .param("user", userJSON)
                .param("device", deviceJSON))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    //this test is used for the DBMS benchmark validation
    @Test
    public void dataTest() throws Exception {
        mockMvc.perform(get("/data"))
                .andExpect(status().isNotFound());
                //.andExpect(view().name("data"));
    }
}
