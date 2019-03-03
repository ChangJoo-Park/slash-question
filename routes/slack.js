var express = require('express');
const Token = require('../models/token')
const { questions } = require('../store')
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({});
});

router.post('/question', function (req, res, next) {
  const token = new Token(req.body)
  console.log('Token => ', token)

  const {
    text
  } = req.body

  // make Question Object
  const uuid = Math.floor(1000 + Math.random() * 9000);
  questions[uuid] = { text, answers: [] }

  res.json({
    "response_type": "in_channel",
    "text": `*$${uuid}* 새 질문이 등록되었습니다.`,
    "attachments": [{
      text
    }]
  })
});

router.post('/answer', function (req, res, next) {
  const token = new Token(req.body)
  // Temporary Hash
  const reg = new RegExp(/^\"\$[0-9][0-9][0-9][0-9]\" /);
  const {
    text
  } = req.body

  if (reg.test(token._text)) {
    const results = reg.exec(token._text)
    const hash = results[0].replace(/\"/g, '').replace('$','')
    const question = questions[parseInt(hash, 10)]
    if (!question) {
      res.json({
        "response_type": "ephemeral",
        "text": "잘못된 응답",
        "attachments": [{
          text
        }]
      })
      return
    }

    questions[parseInt(hash, 10)].answers.push(token)

    res.json({
      "response_type": "in_channel",
      "text": '등록되었습니다',
      attachments: [{
        text: token.text
      }]
    })
  } else {
    res.json({
      "response_type": "ephemeral",
      "text": "잘못된 응답",
      "attachments": [{
        text
      }]
    })
  }
});

module.exports = router;