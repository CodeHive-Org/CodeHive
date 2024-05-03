

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
		"name": "allCodes",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "by",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "code",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "submitTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "runTime",
						"type": "uint256"
					}
				],
				"internalType": "struct Question.CodeData[]",
				"name": "",
				"type": "tuple[]"
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
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "codes",
		"outputs": [
			{
				"internalType": "address",
				"name": "by",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "code",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "submitTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "runTime",
				"type": "uint256"
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
				"name": "_winner",
				"type": "address"
			}
		],
		"name": "giveAway",
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
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "submissions",
		"outputs": [
			{
				"internalType": "address",
				"name": "by",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "code",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "submitTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "runTime",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
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
			},
			{
				"internalType": "uint256",
				"name": "runTime",
				"type": "uint256"
			}
		],
		"name": "submitCode",
		"outputs": [],
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
export const ABI_Bank = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_web",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_mod",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "contractAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "questionName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "difficulty",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "creater",
				"type": "address"
			}
		],
		"name": "questionPost",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "contractAdd",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "diffi",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_creater",
				"type": "address"
			}
		],
		"name": "addAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "questionList",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "question",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "difficulty",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "creater",
						"type": "address"
					}
				],
				"internalType": "struct Question.Ques[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]