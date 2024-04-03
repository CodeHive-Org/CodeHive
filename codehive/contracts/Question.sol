// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Question {
    //predefiners...
    string public QuestionData;//ipfs data goes here....
    string public topicName;//name of the bounty....
    address moderator;//owner of the bounty....
    address webHandler;
    
    //non static data...
    uint256 public bountyValue;
    bool public claimed = false;// initially the bounty will be unclaimed....
    address public bountyWinner = address(0);
    string public winnerCode;
    mapping(address => string) codes;
    address[] submissions;
    string public chatHash;
    uint16 public difficulty;

    modifier onlyModerator(){
        require(msg.sender == moderator, "Not authoresised.");
        _;
    }
    modifier onlyWebHandler(){
        require(msg.sender == webHandler, "Not authoresised.");
        _;
    }
    constructor(string memory _name, string memory _quesData, address _mod, uint16 _diff, string memory _chatHash, address _webHandler)payable{
        QuestionData = _quesData;
        topicName = _name;
        moderator = _mod;
        //funding the question....
        bountyValue = msg.value;
        claimed = false;
        difficulty = _diff;
        chatHash=_chatHash;
        webHandler = _webHandler;
    }
    function submitCode(string memory _codeHash, address _sender)public onlyWebHandler returns(bool){
        require(bytes(codes[_sender]).length==0,"code allready submitted.");
        codes[_sender] = _codeHash;
        submissions.push(_sender);
        if(claimed){
            return false;
        }
        (bool se, ) = _sender.call{value: bountyValue}("");
        claimed = se;
        bountyWinner == _sender;
        winnerCode = _codeHash;
        return se;
    }
    
    function haveSubmitted()public view returns(bool){
        return (bytes(codes[msg.sender]).length != 0);
    }
}