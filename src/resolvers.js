import * as jose from 'jose';
import { GraphQLError } from 'graphql';

function unauthenticatedError() {
  throw new GraphQLError('Bearer Token either missing, expired, or invalid.', {
    extensions: {
      code: 'UNAUTHENTICATED',
      http: {
        status: 401,
      },
    },
  });
}

function unauthorizedError() {
  throw new GraphQLError('You are not authorized to access this field.', {
    extensions: {
      code: 'UNAUTHORIZED',
      http: {
        status: 403,
      },
    },
  });
}

function authenticateResolver(user) {
  if(!user) {
    unauthenticatedError();
  }
}

export const resolvers = {
  Query: {
    books: (_, __, { dataSources, user }) => {
      // TODO: Use dataSources

      return [
        {
          title: 'Elysia',    
          author: 'saltyAom'
        }
      ];
    },
    booksAuthed: (_, __, { dataSources, user }) => {
      // Authenticate resolver
      authenticateResolver(user);

      // TODO: Use dataSources

      return [
        {
          title: 'Elysia',    
          author: 'saltyAom'
        }
      ];
    },
  },
  Mutation: {
    login: async (_, { email, password }, { dataSources }) => {
      // TODO: Validate email and password and use dataSources

      // Generate JWT
      try {
        const secret = new TextEncoder().encode(
          process.env.JWT_SECRET,
        );
  
        const alg = 'HS256';
  
        const token = await new jose.SignJWT({ 'urn:example:claim': true })
          .setProtectedHeader({ alg })
          .setIssuedAt()
          .setIssuer('urn:example:issuer')
          .setAudience('urn:example:audience')
          .setExpirationTime('2h')
          .sign(secret);

        return {
          token,
        };
      } catch (err) {
        unauthenticatedError();
      }
    },
  }
};