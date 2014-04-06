package models;

import java.util.Date;

public class Poll {

    private Long id;
    private String question;
    private Date expiration;

    public Poll(Long id, String question, Date expiration) {
        this.id = id;
        this.question = question;
        this.expiration = expiration;
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
}
