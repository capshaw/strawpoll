package models;

import java.util.Date;
import java.util.List;

public class Poll {

    private Long id;
    private String question;
    private List<String> choices;
    private Date expiration;

    public Poll(Long id, String question, List<String> choices, Date expiration) {
        this.id = id;
        this.question = question;
        this.expiration = expiration;
        this.choices = choices;
    }

    public String getQuestion() {
        return question;
    }

    public Date getExpiration() {
        return expiration;
    }

    public Long getId() {
        return id;
    }

    public List<String> getChoices() {
        return choices;
    }
}
