package models;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Poll {

    private Long id;
    private String question;
    private List<String> choices;
    private Map<Integer, Integer> votes;
    private Date expiration;

    public Poll(Long id, String question, List<String> choices, Date expiration) {
        this.id = id;
        this.question = question;
        this.expiration = expiration;
        this.choices = choices;

        /* Set all vote counts to empty. */
        votes = new HashMap<Integer, Integer>();
        for (int i = 0; i < choices.size(); i++) {
            votes.put(i, 0);
        }
    }

    public void addVote(int key) {
        if (votes.containsKey(key)) {
            votes.put(key, votes.get(key) + 1);
        }
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

    public Map<Integer, Integer> getVotes() {
        return votes;
    }
}
