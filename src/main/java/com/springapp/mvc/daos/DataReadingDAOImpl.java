package com.springapp.mvc.daos;

import com.springapp.mvc.models.DataReading;
import com.springapp.mvc.models.Device;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Created by Peter Yordanov on 29.10.2014 г..
 */
@Repository
public class DataReadingDAOImpl implements DataReadingDAO {

    private static final Logger LOGGER = LoggerFactory.getLogger(DeviceDAOImpl.class);
    private Session currentSession;

    private SessionFactory sessionFactory;

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public void addDataReading(DataReading dr) {
        currentSession = this.sessionFactory.getCurrentSession();
        currentSession.persist(dr);

        LOGGER.info("DR added: /n" + dr);
    }

    @Override
    public void updateDataReading(DataReading dr) {
        currentSession = this.sessionFactory.getCurrentSession();
        currentSession.update(dr);

        LOGGER.info("DR updated: /n" + dr);
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<DataReading> getAll() {
        currentSession = this.sessionFactory.getCurrentSession();
        List<DataReading> dataReadingList = currentSession.createQuery("from DataReading").list();

        for (DataReading dr : dataReadingList) {
            LOGGER.info("DR list: " + dr);
        }

        return dataReadingList;
    }

    @Override
    public DataReading getDataReading(Integer id) {
        currentSession = this.sessionFactory.getCurrentSession();
        DataReading dr = (DataReading) currentSession.load(DataReading.class, id);

        LOGGER.info("DR retrieved: " + dr);

        return dr;
    }

    @Override
    public void deleteDataReading(Integer id) {
        currentSession = this.sessionFactory.getCurrentSession();
        DataReading dr = (DataReading) currentSession.load(DataReading.class, id);

        if (!dr.equals(null)) {
            currentSession.delete(dr);
        }

        LOGGER.info("DR deleted: " + dr);
    }
}
