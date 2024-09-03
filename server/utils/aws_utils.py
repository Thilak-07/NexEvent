import boto3
import os
import base64
from botocore.exceptions import ClientError
from dotenv import load_dotenv
load_dotenv()


def get_secret(secret_name):
    # Create a Secrets Manager client
    client = boto3.client(
        'secretsmanager', region_name=os.getenv('AWS_REGION'))

    try:
        # Fetch the secret value
        get_secret_value_response = client.get_secret_value(
            SecretId=secret_name)

        # Decrypts secret using the associated KMS key.
        if 'SecretString' in get_secret_value_response:
            secret = get_secret_value_response['SecretString']
        else:
            secret = base64.b64decode(
                get_secret_value_response['SecretBinary'])

        return secret

    except ClientError as e:
        # Handle specific exceptions as needed
        raise e


def get_parameter(parameter_name):
    # Create an SSM client
    client = boto3.client('ssm', region_name=os.getenv('AWS_REGION'))

    try:
        # Fetch the parameter value
        parameter = client.get_parameter(
            Name=parameter_name, WithDecryption=True)
        return parameter['Parameter']['Value']

    except ClientError as e:
        raise e
