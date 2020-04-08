import { gql } from 'apollo-server';

export default gql`


	type Mutation {

		createAccount() : 


	}

	Type URLSlug {
		id : ID!
		url : String!
		createdAt : String!
	}

	Type User {
		id : ID!
		username : String!
		confirmed : Boolean!
		createdAt : String!
		urlSlug : URLSlug!	
	}

	type Post {
		
	}

	type Profile {
		id : ID!
		posts : [Post!]!
		user : User!
		createdAt : String!
	}



	Type AuthObject {
		token : String!
		profile : Profile!
	}

`;
