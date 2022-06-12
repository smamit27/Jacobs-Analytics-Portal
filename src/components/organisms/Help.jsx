import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Button, Text } from '../atoms';

import { colors, device } from '../../theme';
import { useDispatch } from 'react-redux'
import { toggleHelp } from "./../../redux/common/action";

import help from "../../json/help.json";

const HelpWrapper = styled.section`
  background: ${colors.primary.redp1};
  padding: 20px;
  position: fixed;
  width: 100%;
  right: 0;
  z-index: 3;
  top: 0;
  @media only screen and ${device.mobileL} {
    width: 375px;
    bottom: 546px;
    top: auto;
    position: absolute;
  }
  @media only screen and ${device.tabletM} {
    width: 375px;
    bottom: 330px;
    top: auto;
    position: absolute;
  }

`

const HeadingWrapper = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  justify-content: space-between;
`

const HelpListContWrapper = styled.div`
  margin-bottom: 15px;
`

const HelpListWrapper = styled.div`
  border-bottom: solid 1px ${colors.primary.white20};
  button{
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    padding-right: 0;
    width: 100%;
    text-align: left;
  }
`

const QuestionWrapper = styled.div``

const QuestionListWrapper = styled.div`
  &.last--item{
    margin-bottom: 20px;
    div{
      border-bottom: 0;
    }
  } 
`

const FaqWrapper = styled.div`
  &:last-child > div{
    border-bottom: 0;
  }
`

const CloseBtnWrapper = styled.div`
  button{
    padding-top: 0;
    padding-right: 0;
  }
`

const GoBackWrapper = styled.div`
  button{
    padding-top: 0;
    padding-left: 0;
  }
`
const AnswerContWrapper = styled.div`
  margin-bottom: 20px;
`

export const Help = (props) => {
  const dispatch = useDispatch()
  const [helpData] = useState(help);

  const [questionNumber, setQuestionNumber] = useState({ selectedQuestion: {} });
  const [questionIndex, setQuestionIndex] = useState(-1);
  const [seeFaq, setSeeFaq] = useState(false);

  const seeQuestion = (index) => {
    var oldValue = questionNumber;
    oldValue.selectedQuestion = {};
    oldValue.selectedQuestion = helpData.faq.list[index];
    setQuestionIndex(index);
    setQuestionNumber({
      selectedQuestion: oldValue.selectedQuestion
    });
    setAnswerNumber({
      selectedAnswer: {}
    });
    setSeeFaq(true);
    setSeeSubFaq(false);
  }

  const [answerNumber, setAnswerNumber] = useState({ selectedAnswer: {} });
  const [seeSubFaq, setSeeSubFaq] = useState(false);

  const seeAnswer = (subindex) => {
    var oldValue = answerNumber;
    oldValue.selectedAnswer = {};
    oldValue.selectedAnswer = questionNumber.selectedQuestion.subquestionlist[subindex];
    setAnswerNumber({
      selectedAnswer: oldValue.selectedAnswer
    });
    setSeeSubFaq(true);
  }

  const viewAllQuestion = () => {
    setQuestionNumber({
      selectedQuestion: {}
    });
    setAnswerNumber({
      selectedAnswer: {}
    });
    setSeeFaq(false);
  }

  return <HelpWrapper>
    {
      !seeFaq &&
      <HeadingWrapper>
        <Text tag="h4" text={helpData.heading} color={colors.white} />
        <CloseBtnWrapper onClick={() => dispatch(toggleHelp())}>
          <Button text="" icon="close" bg={colors.transparent} iconcolor={colors.white} />
        </CloseBtnWrapper>
      </HeadingWrapper>
    }
    {
      !seeFaq &&
      <HelpListContWrapper>
        <HelpListWrapper>
          <Button text={helpData.quickguide.heading} icon="chevronright" bg={colors.transparent} iconcolor={colors.white} />
        </HelpListWrapper>
      </HelpListContWrapper>
    }
    {
      !seeFaq &&
      <HeadingWrapper>
        <Text tag="h4" text={helpData.faq.heading} color={colors.white} />
      </HeadingWrapper>
    }
    <HelpListContWrapper>
      {helpData.faq.list.map((item, index) =>
        <FaqWrapper key={index}>
          {
            !seeFaq &&
            <HelpListWrapper onClick={() => seeQuestion(index)}>
              <Button text={item.question} icon="chevronright" bg={colors.transparent} iconcolor={colors.white} />
            </HelpListWrapper>
          }
        </FaqWrapper>
      )}
    </HelpListContWrapper>
    {
      (seeFaq && questionNumber.selectedQuestion) &&
      <QuestionWrapper>
        {
          !seeSubFaq &&
          <div>
            <HeadingWrapper>
              <GoBackWrapper onClick={() => viewAllQuestion()}>
                <Button text="" icon="chevronleft" bg={colors.transparent} iconcolor={colors.white} />
              </GoBackWrapper>
              <Text tag="h4" text={helpData.faq.heading} color={colors.white} />
              <CloseBtnWrapper>
                <Button text="" icon="close" bg={colors.transparent} iconcolor={colors.white} />
              </CloseBtnWrapper>
            </HeadingWrapper>
            <HeadingWrapper>
              <Text tag="h4" text={questionNumber.selectedQuestion.question} color={colors.white} />
            </HeadingWrapper>
            {questionNumber.selectedQuestion.subquestionlist.map((subitem, subindex) =>
              <div key={subindex}>
                <QuestionListWrapper className={subindex === questionNumber.selectedQuestion.subquestionlist.length - 1 ? 'last--item' : ''}>
                  <HelpListWrapper onClick={() => seeAnswer(subindex)}>
                    <Button text={subitem.question} icon="chevronright" bg={colors.transparent} iconcolor={colors.white} />
                  </HelpListWrapper>
                </QuestionListWrapper>
              </div>
            )}
          </div>
        }
        {
          (seeSubFaq && answerNumber.selectedAnswer) &&
          <AnswerContWrapper>
            <HeadingWrapper>
              <GoBackWrapper onClick={() => seeQuestion(questionIndex)}>
                <Button text="" icon="chevronleft" bg={colors.transparent} iconcolor={colors.white} />
              </GoBackWrapper>
              <Text tag="h4" text={questionNumber.selectedQuestion.question} color={colors.white} />
              <CloseBtnWrapper>
                <Button text="" icon="close" bg={colors.transparent} iconcolor={colors.white} />
              </CloseBtnWrapper>
            </HeadingWrapper>
            <HeadingWrapper>
              <Text tag="h4" text={answerNumber.selectedAnswer.question} color={colors.white} />
            </HeadingWrapper>
            <Text tag="p" text={answerNumber.selectedAnswer.answer} color={colors.white} />
          </AnswerContWrapper>
        }
        <HeadingWrapper>
          <Text tag="h4" text={helpData.allquestion.heading} color={colors.white} />
        </HeadingWrapper>
        <HelpListContWrapper>
          <HelpListWrapper onClick={() => viewAllQuestion()}>
            <Button text={helpData.allquestion.value} icon="chevronright" bg={colors.transparent} iconcolor={colors.white} />
          </HelpListWrapper>
          <HelpListWrapper>
            <Button text={helpData.allquestion.touch} icon="chevronright" bg={colors.transparent} iconcolor={colors.white} />
          </HelpListWrapper>
        </HelpListContWrapper>
      </QuestionWrapper>
    }

    {
      !seeFaq &&
      <HeadingWrapper>
        <Text tag="h4" text={helpData.otherlinks.heading} color={colors.white} />
      </HeadingWrapper>
    }
    {
      !seeFaq &&
      <HelpListContWrapper>
        {helpData.otherlinks.list.map((item, index) =>
          <HelpListWrapper key={index}>
            <Button text={item.linktext} icon="link" bg={colors.transparent} iconcolor={colors.white} />
          </HelpListWrapper>
        )}
      </HelpListContWrapper>
    }
  </HelpWrapper>;
};

Help.defaultProps = {
};
