package models;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Poll {

    private Long id;
    private String question;
    private Map<Integer, Answer> answers;
    private Date expiration;

    public Poll(Long id, String question, List<String> questions, Date expiration) {
        this.id = id;
        this.question = question;
        this.expiration = expiration;

        /* Set all vote counts to empty. */
        answers = new HashMap<Integer, Answer>();
        for (int i = 0; i < questions.size(); i++) {
            answers.put(i, new Answer(i, questions.get(i), 0));
        }
    }

    public void addVote(int key) {
        if (answers.containsKey(key)) {
            answers.get(key).addVote();
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

    public Map<Integer, Answer> getAnswers() {
        return answers;
    }
}
