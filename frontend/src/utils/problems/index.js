

export const problems = {
    Longest_Common_Prefix: "TTYWGCYqyfmySVytAWzJGjqkqqFyG2VCR9",
}
export const ABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_quesData",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_mod",
                "type": "address"
            },
            {
                "internalType": "uint16",
                "name": "_diff",
                "type": "uint16"
            },
            {
                "internalType": "address",
                "name": "_chatHash",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_webHandler",
                "type": "address"
            }
        ],
        "stateMutability": "payable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "QuestionData",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "bountyValue",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "bountyWinner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "chatHash",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "claimed",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "difficulty",
        "outputs": [
            {
                "internalType": "uint16",
                "name": "",
                "type": "uint16"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_sender",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_newContent",
                "type": "string"
            },
            {
                "internalType": "uint16",
                "name": "_index",
                "type": "uint16"
            }
        ],
        "name": "editChat",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "fetchChat",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "content",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "postTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "editTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "edited",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint16",
                        "name": "index",
                        "type": "uint16"
                    }
                ],
                "internalType": "struct Question.Message[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "haveSubmitted",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_content",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_sender",
                "type": "address"
            }
        ],
        "name": "postDiscussion",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_codeHash",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_sender",
                "type": "address"
            }
        ],
        "name": "submitCode",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "topicName",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "winnerCode",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]