import {VoteComponent} from './vote.component';


describe('VoteComponent', () => {
    it('Should increment 1 to the total votes if upVote', () => {
        //arrange
        let component = new VoteComponent();

        //Act
        component.upVote();

        //Assert
        expect(component.totalVotes).toBe(1);
    })

    it('should substract 1 to the total votes if downVote', () => {
        let component = new VoteComponent();

        component.downVote();
        
        expect(component.totalVotes).toBe(-1);
    })
})