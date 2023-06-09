"""add payment model, update order model

Revision ID: 5081174b9e4e
Revises: 925d0c258698
Create Date: 2023-06-27 16:55:26.695136

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5081174b9e4e'
down_revision = '925d0c258698'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('payments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('code', sa.String(), nullable=True),
    sa.Column('money', sa.String(), nullable=True),
    sa.Column('payment_content', sa.String(), nullable=True),
    sa.Column('status', sa.String(), nullable=True),
    sa.Column('bank_code', sa.String(), nullable=True),
    sa.Column('payment_date', sa.DateTime(timezone=True), nullable=True),
    sa.Column('order_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['order_id'], ['orders.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_payments_id'), 'payments', ['id'], unique=False)
    op.add_column('orders', sa.Column('status', sa.Integer(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('orders', 'status')
    op.drop_index(op.f('ix_payments_id'), table_name='payments')
    op.drop_table('payments')
    # ### end Alembic commands ###
