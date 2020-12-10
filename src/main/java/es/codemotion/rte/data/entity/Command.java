package es.codemotion.rte.data.entity;

import javax.persistence.Entity;

import es.codemotion.rte.data.AbstractEntity;
import java.time.LocalDate;
import javax.annotation.Nullable;

@Entity
public class Command extends AbstractEntity {

    private Integer tableNumber;
    private String type;
    private String description;
    private Integer quantity;
    @Nullable
    private LocalDate hour;
    private boolean served;

    public Integer getTableNumber() {
        return tableNumber;
    }
    public void setTableNumber(Integer tableNumber) {
        this.tableNumber = tableNumber;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public Integer getQuantity() {
        return quantity;
    }
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    public LocalDate getHour() {
        return hour;
    }
    public void setHour(LocalDate hour) {
        this.hour = hour;
    }
    public boolean isServed() {
        return served;
    }
    public void setServed(boolean served) {
        this.served = served;
    }

}
