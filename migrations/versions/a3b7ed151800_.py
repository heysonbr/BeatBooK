"""empty message

Revision ID: a3b7ed151800
Revises: 56f5296ea673
Create Date: 2024-03-28 17:43:46.100907

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a3b7ed151800'
down_revision = '56f5296ea673'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('band', schema=None) as batch_op:
        batch_op.drop_constraint('band_name_key', type_='unique')
        batch_op.drop_constraint('band_user_id_fkey', type_='foreignkey')
        batch_op.drop_column('user_id')

    with op.batch_alter_table('event', schema=None) as batch_op:
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.drop_constraint('event_name_key', type_='unique')
        batch_op.drop_constraint('event_pictures_key', type_='unique')

    with op.batch_alter_table('place', schema=None) as batch_op:
        batch_op.drop_constraint('place_name_key', type_='unique')
        batch_op.drop_constraint('place_user_id_fkey', type_='foreignkey')
        batch_op.drop_column('user_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('place', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False))
        batch_op.create_foreign_key('place_user_id_fkey', 'user', ['user_id'], ['id'])
        batch_op.create_unique_constraint('place_name_key', ['name'])

    with op.batch_alter_table('event', schema=None) as batch_op:
        batch_op.create_unique_constraint('event_pictures_key', ['pictures'])
        batch_op.create_unique_constraint('event_name_key', ['name'])
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=True)

    with op.batch_alter_table('band', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.create_foreign_key('band_user_id_fkey', 'user', ['user_id'], ['id'])
        batch_op.create_unique_constraint('band_name_key', ['name'])

    # ### end Alembic commands ###
