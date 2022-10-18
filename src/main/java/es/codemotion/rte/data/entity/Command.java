package es.codemotion.rte.data.entity;

import java.time.LocalTime;

import javax.persistence.Entity;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

import es.codemotion.rte.data.AbstractEntity;

@Entity
public class Command extends AbstractEntity {

    @Min(1) @Max(8)
    private Integer tableNumber;
    @NotBlank
    private String type;
    @NotBlank
    private String description;
    @Min(1) @Max(12)
    private Integer quantity;
    private LocalTime hour;
    private boolean served;

    public Command() {
    }

    public Command(@Min(1) @Max(8) Integer tableNumber, @NotBlank String type, @NotBlank String description,
            @Min(1) @Max(12) Integer quantity, LocalTime hour, boolean served) {
        this.tableNumber = tableNumber;
        this.type = type;
        this.description = description;
        this.quantity = quantity;
        this.hour = hour;
        this.served = served;
    }

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
    public LocalTime getHour() {
        return hour;
    }
    public void setHour(LocalTime hour) {
        this.hour = hour != null ? hour : LocalTime.now();
    }
    public boolean isServed() {
        return served;
    }
    public void setServed(boolean served) {
        this.served = served;
    }

}
